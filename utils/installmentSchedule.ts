import { InstallmentPlan } from "~/server/api/models/[id]/index.get"

interface ScheduleRow {
  no: number
  date: string
  remainingAmount: number
  paymentAmount: number
  totalPaid: number
}

export function generateInstallmentSchedule(
  plan: InstallmentPlan,
  totalAmount: number
): ScheduleRow[] {
  const schedule: ScheduleRow[] = []
  
  // Calculate the amount to be financed after prepayment
  const prepaymentAmount = totalAmount * (plan.minimum_prepayment / 100)
  const amountToFinance = totalAmount - prepaymentAmount
  
  // Calculate monthly payment if not provided
  let monthlyPayment = plan.monthly_payment
  if (!monthlyPayment) {
    // If interest-free
    if (!plan.annual_interest) {
      monthlyPayment = amountToFinance / plan.months
    } else {
      // With interest (standard amortization formula)
      const monthlyRate = (plan.annual_interest / 100) / 12
      monthlyPayment = amountToFinance * (monthlyRate * Math.pow(1 + monthlyRate, plan.months)) / 
                       (Math.pow(1 + monthlyRate, plan.months) - 1)
    }
  }
  
  let remainingAmount = amountToFinance
  let cumulativePaid = prepaymentAmount // Start with prepayment already made
  
  // Get current date to calculate payment dates
  const startDate = new Date()
  
  for (let i = 1; i <= plan.months; i++) {
    // Calculate next payment date
    const paymentDate = new Date(startDate)
    paymentDate.setMonth(paymentDate.getMonth() + i)
    
    // Format date as DD.MM.YYYY (matching your example)
    const formattedDate = paymentDate.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    
    // For the last payment, ensure we pay exactly the remaining amount
    const payment = i === plan.months ? remainingAmount : monthlyPayment

    cumulativePaid += payment
    
    schedule.push({
      no: i,
      date: formattedDate,
      remainingAmount: Math.round(remainingAmount * 100) / 100,
      paymentAmount: Math.round(payment * 100) / 100,
      totalPaid: Math.round(cumulativePaid * 100) / 100
    })
    
    remainingAmount -= payment
  }
  
  return schedule
}
