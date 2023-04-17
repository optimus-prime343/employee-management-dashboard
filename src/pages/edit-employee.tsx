import { Alert, LoadingOverlay } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconError404 } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { EmployeeForm } from '@/components/employee/employee-form'
import { useEditEmployee, useEmployeeDetail } from '@/hooks/employee'
import { BaseLayout } from '@/layouts/base-layout'

export default function EditEmployee() {
  const router = useRouter()
  const { id } = router.query
  const {
    data: employeeDetail,
    isLoading: isEmployeeDetailLoading,
    refetch: refetchEmployeeDetail,
  } = useEmployeeDetail(id as string)
  const editEmployee = useEditEmployee()

  const handleEditEmployee = useCallback(
    (editEmployeeFormData: FormData) => {
      editEmployee.mutate(
        {
          id: id as string,
          editEmployeeFormData,
        },
        {
          onSuccess: message => {
            refetchEmployeeDetail()
              .then(() => {
                void router.push({
                  pathname: '/',
                  query: { activeTab: 'Employees' },
                })
                showNotification({
                  title: 'Success',
                  message,
                  color: 'teal',
                })
              })
              .catch(console.error)
          },
          onError: error => {
            showNotification({
              title: 'Error',
              message: error.message,
              color: 'red',
            })
          },
        }
      )
    },
    [editEmployee, id, refetchEmployeeDetail, router]
  )

  return (
    <>
      <LoadingOverlay
        overlayBlur={4}
        sx={{ position: 'fixed', inset: 0 }}
        visible={isEmployeeDetailLoading}
      />
      <BaseLayout title='Edit employee'>
        {employeeDetail !== undefined ? (
          <EmployeeForm
            employee={employeeDetail}
            isEditButtonLoading={editEmployee.isLoading}
            mode='edit'
            onEditEmployeeSubmit={handleEditEmployee}
          />
        ) : (
          <Alert color='red' icon={<IconError404 />} title='Not found'>
            Employee not found
          </Alert>
        )}
      </BaseLayout>
    </>
  )
}
