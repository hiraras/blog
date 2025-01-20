# 弹窗

## 将 modals 信息存储到 store 里

```ts
import React from "react";
import { create } from "zustand";

type Config = {
  maskClosable?: boolean;
};

type Modal = {
  modal: JSX.Element;
  id: string;
  config?: Config;
};

type State = { modals: Modal[]; id: number };

type Actions = {
  open: (reactNode: JSX.Element, config?: Config) => { onDismiss: () => void };
  openAsync: (reactNode: JSX.Element, config?: Config) => Promise<any>;
  destroy: (id?: string) => void;
};

const rootId = "meet48-modal-root";
export function getModalId(id: number) {
  return `meet48-modal-${id}`;
}

export function getRoot() {
  const root = document.querySelector(`#${rootId}`);
  if (root) {
    return root;
  }
  const newRoot = document.createElement("div");
  newRoot.setAttribute("id", rootId);
  document.body.append(newRoot);
  return newRoot;
}

export const useModal = create<State & Actions>((set, get) => ({
  modals: [],
  id: 0,
  open(reactNode, config?: Config) {
    const id = getModalId(get().id);
    function onDismiss() {
      get().destroy(id);
    }
    const modal = React.isValidElement(reactNode)
      ? React.cloneElement(reactNode, { onDismiss } as any)
      : reactNode;
    set(() => ({
      modals: [...get().modals, { modal, id, config }],
      id: get().id + 1,
    }));
    return { onDismiss };
  },
  async openAsync(reactNode, config?: Config) {
    const id = getModalId(get().id);
    let onDismiss: any;
    let onOk: any;
    const promise = new Promise<any>(function (resolve) {
      onDismiss = () => {
        get().destroy(id);
        resolve(false);
      };
      onOk = (data: unknown) => {
        get().destroy(id);
        resolve(data ?? true);
      };
    });
    const modal = React.isValidElement(reactNode)
      ? React.cloneElement(reactNode, { onDismiss, onOk } as any)
      : reactNode;
    set(() => ({
      modals: [...get().modals, { modal, id, config }],
      id: get().id + 1,
    }));
    return promise;
  },
  destroy(id?: string) {
    const modals =
      typeof id === "undefined"
        ? []
        : get().modals.filter((modal) => modal.id !== id);
    set(() => ({ modals }));
  },
}));
```

## 使用 store 的 modals 并渲染

```ts
import { useModal as useStoreModal, getRoot } from "@/store/useModal";

const { modals } = useStoreModal();

return (
  <>
    {modals.map((modal) => {
      return createPortal(
        <Modal id={modal.id} maskClosable={modal.config?.maskClosable}>
          {modal.modal}
        </Modal>,
        getRoot()
      );
    })}
  </>
);
```
