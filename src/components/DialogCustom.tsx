import { Modal } from 'antd'
import * as React from 'react'

export interface IDialogCustomProps {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  children?: React.ReactNode
  title: string
  width?: number
}

export default function DialogCustom(props: IDialogCustomProps) {
  const { isModalOpen, children, title, setIsModalOpen, width = 520 } = props
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={width}
    >
      {children}
    </Modal>
  )
}
