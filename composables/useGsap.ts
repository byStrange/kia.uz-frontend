import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


const tm = gsap.timeline()

export const useGsap = () => {
  return { gsap, tm };
}
