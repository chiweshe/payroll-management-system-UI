export interface Payroll {
  employeeId: number;
  employeeName: string;
  payrollMonth: string;
  basicSalary: number;
  totalAllowances: number;
  totalDeductions: number;
  grossPay: number;
  netPay: number;
  generatedAt: string;
  status: string;
}
