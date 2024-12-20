interface Point {
  x: number
  y: number
}

interface Connector {
  id: string
  start: Point
  end: Point
  breakPoint?: Point
  progress: number
  removing: boolean
}

interface AnnotatorOptions {
  breakPointOffset?: number
  animationDuration?: number
  lineColor?: string
  lineWidth?: number
  dotRadius?: number
}

export const useSvgAnnotator = (options: AnnotatorOptions = {}) => {
  const svgRef = ref<SVGSVGElement | null>(null)
  const connectors = ref<Connector[]>([])
  
  const defaultOptions = {
    breakPointOffset: 50,
    animationDuration: 500,
    lineColor: '#2563eb',
    lineWidth: 2,
    dotRadius: 4
  }
  
  const opts = { ...defaultOptions, ...options }
  
  const calculateBreakPoint = (start: Point, end: Point): Point => {
    return {
      x: start.x + opts.breakPointOffset,
      y: start.y,
    }
  }

  const generatePath = (connector: Connector): string => {
    const breakPt = connector.breakPoint || calculateBreakPoint(connector.start, connector.end)
    return `
      M ${connector.start.x} ${connector.start.y}
      L ${breakPt.x} ${breakPt.y}
      L ${connector.end.x} ${connector.end.y}
    `.trim()
  }

  const animateConnector = (connector: Connector, targetProgress: number) => {
    if (!import.meta.client) return

    const startProgress = connector.progress
    const startTime = performance.now()
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / opts.animationDuration, 1)
      
      connector.progress = startProgress + (targetProgress - startProgress) * progress
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else if (connector.removing && targetProgress === 0) {
        connectors.value = connectors.value.filter(c => c.id !== connector.id)
      }
    }
    
    requestAnimationFrame(animate)
  }

  const addConnector = (startPoint: Point, endPoint: Point) => {
    const newConnector: Connector = {
      id: Math.random().toString(36).substring(7),
      start: startPoint,
      end: endPoint,
      breakPoint: calculateBreakPoint(startPoint, endPoint),
      progress: 0,
      removing: false
    }
    
    connectors.value.push(newConnector)
    animateConnector(newConnector, 1)
    
    return newConnector.id
  }

  const removeConnector = (id: string) => {
    const connector = connectors.value.find(c => c.id === id)
    if (connector) {
      connector.removing = true
      animateConnector(connector, 0)
    }
  }

  const updateConnectorPoints = (id: string, startPoint?: Point, endPoint?: Point) => {
    const connector = connectors.value.find(c => c.id === id)
    if (connector) {
      if (startPoint) connector.start = startPoint
      if (endPoint) connector.end = endPoint
      connector.breakPoint = calculateBreakPoint(connector.start, connector.end)
    }
  }

  // Coordinate conversion utilities
    // Convert viewport coordinates to SVG coordinates
  const getSvgPoint = (event: MouseEvent): Point | null => {
    if (!svgRef.value || !import.meta.client) return null

    const svgElement = svgRef.value
    const rect = svgElement.getBoundingClientRect()
    
    // Get the current SVG viewBox
    const viewBox = svgElement.viewBox.baseVal
    
    // Calculate the scale factors
    const scaleX = viewBox.width / rect.width
    const scaleY = viewBox.height / rect.height
    
    // Calculate relative coordinates within the SVG
    const relativeX = event.clientX - rect.left
    const relativeY = event.clientY - rect.top
    
    // Convert to SVG coordinate space
    return {
      x: (relativeX * scaleX) + viewBox.x,
      y: (relativeY * scaleY) + viewBox.y
    }
  }

  // Convert element position to SVG coordinates
  const getElementSvgPoint = (element: HTMLElement): Point | null => {
    if (!svgRef.value || !import.meta.client) return null

    const svgElement = svgRef.value
    const rect = svgElement.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()
    
    // Get the current SVG viewBox
    const viewBox = svgElement.viewBox.baseVal
    
    // Calculate the scale factors
    const scaleX = viewBox.width / rect.width
    const scaleY = viewBox.height / rect.height
    
    // Calculate element center position relative to SVG
    const relativeX = (elementRect.left - rect.left) + (elementRect.width / 2)
    const relativeY = (elementRect.top - rect.top) + (elementRect.height / 2)
    
    // Convert to SVG coordinate space
    return {
      x: (relativeX * scaleX) + viewBox.x,
      y: (relativeY * scaleY) + viewBox.y
    }
  }

  return {
    svgRef,
    connectors,
    addConnector,
    getElementSvgPoint,
    removeConnector,
    updateConnectorPoints,
    getSvgPoint,
    generatePath,
    opts
  }
}
