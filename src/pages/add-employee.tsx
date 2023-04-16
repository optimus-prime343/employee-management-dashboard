import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { EmployeeForm } from '@/components/employee/employee-form'
import { useAddEmployee } from '@/hooks/employee'
import { BaseLayout } from '@/layouts/base-layout'

export default function AddEmployeePage() {
  const router = useRouter()
  const addEmployee = useAddEmployee()
  const handleAddEmployeeSubmit = useCallback(
    (employeeFormData: FormData) => {
      addEmployee.mutate(employeeFormData, {
        onSuccess: message => {
          void router.push({ pathname: '/', query: { activeTab: 'Employees' } })
          showNotification({
            title: 'Success',
            message,
            color: 'green',
          })
        },
        onError: error => {
          showNotification({
            title: 'Error',
            message: error.message,
            color: 'red',
          })
        },
      })
    },
    [addEmployee, router]
  )
  return (
    <BaseLayout
      contentTitle='Add new employee'
      showBreadcrumbs
      title='Add employee'
    >
      <EmployeeForm
        isAddButtonLoading={addEmployee.isLoading}
        mode='add'
        onAddEmployeeSubmit={handleAddEmployeeSubmit}
      />
    </BaseLayout>
  )
}
