import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },{
    label: 'Employee Management',
    isTitle: true
  },
  {
    label: 'Employee',
    icon: 'users',
    link: '/employee/view'
  },
  {
    label: 'Department',
    icon: 'columns',
    link: '/department/view'
  },
  {
    label: 'Leave Days',
    icon: 'columns',
    link: '/department/view'
  },

  {
    label: 'Configurations',
    isTitle: true
  },
  {
    label: 'Allowances',
    icon: 'credit-card',
    link: '/allowance/view'
  },
  {
    label: 'Deductions',
    icon: 'dollar-sign',
    link: '/deduction/view'
  },
  {
    label: 'Tax Slabs',
    icon: 'dollar-sign',
    link: '/tax/view'
  },


  {
    label: 'Salaries',
    isTitle: true
  },
  {
    label: 'Payroll Management',
    icon: 'file-text',
    link: '/payroll/view'
  },
  {
    label: 'Salary Structures',
    icon: 'dollar-sign',
    link: '/salary/view'
  },

  {
    label: 'User Management',
    isTitle: true
  },
  {
    label: 'Users',
    icon: 'users',
    link: '/users/view'
  },
  {
    label: 'User Groups',
    icon: 'user-minus',
    link: '/user-groups/view'
  },
  {
    label: 'User Roles',
    icon: 'user-check',
    link: '/user-roles/view'

  },
];
