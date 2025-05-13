export interface EmployeeAllowance{
  id: number;
  employeeId: number;
  allowanceId: number;
  employeeName: string;
  allowanceName: string;
  amount: number;
  status: string;
  dateCreated: string;
}
