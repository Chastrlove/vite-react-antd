import { ModalProps } from "antd/lib/modal/Modal";
import { useToggle } from "hooks/useToggle";
import { usePromise } from "hooks/usePromise";
import usePersistFn from "hooks/usePersistFn";

interface ModalVisibleProps extends Omit<ModalProps, "onOk" | "onCancel"> {
  onOk?: (e?) => void;
  /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调 */
  onCancel?: (e?) => void;
}

export const useModalVisible = (props: ModalVisibleProps): [ModalProps, (value?) => void] => {
  const [visible, toggleVisible] = useToggle(props.visible ?? false);

  const { isLoading, request: runOnOK } = usePromise(async () => {
    return props.onOk?.();
  });

  const onCancel = usePersistFn(() => {
    toggleVisible(false);
    props.onCancel?.();
  });

  const onOk = usePersistFn(async () => {
    await runOnOK();
    onCancel();
  });

  return [
    {
      ...props,
      visible,
      onCancel,
      onOk,
      confirmLoading: isLoading,
    },
    toggleVisible,
  ];
};
