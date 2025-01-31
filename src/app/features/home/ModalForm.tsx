import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MODAL_CONFIG = {
  profile: {
    title: "회원정보 확인",
    description: "회원정보를 입력해주세요",
    schema: z.object({
      name: z.string().min(1, "이름을 입력해주세요"),
      birthday: z.string().min(1, "생년월일을 입력해주세요"),
    }),
    fields: [
      { name: "name" as const, label: "이름" },
      { name: "birthday" as const, label: "생년월일" },
    ],
  },
  login: {
    title: "로그인",
    description: "회원정보를 입력해주세요",
    schema: z.object({
      employeeNumber: z.string().min(1, "사번을 입력해주세요"),
      password: z.string().min(1, "비밀번호를 입력해주세요"),
    }),
    fields: [
      { name: "employeeNumber" as const, label: "사번" },
      { name: "password" as const, label: "비밀번호" },
    ],
  },
} as const;

export type ModalType = keyof typeof MODAL_CONFIG | null;
type ModalConfigType = typeof MODAL_CONFIG;

type ModalFormData<T extends Exclude<ModalType, null>> = z.infer<
  ModalConfigType[T]["schema"]
>;

interface Props {
  modalType: Exclude<ModalType, null>;
}

function ModalForm({ modalType }: Props) {
  const config = MODAL_CONFIG[modalType];
  const form = useForm<ModalFormData<typeof modalType>>({
    defaultValues: Object.fromEntries(
      config.fields.map((field) => [field.name, ""])
    ) as ModalFormData<typeof modalType>,
    resolver: zodResolver(MODAL_CONFIG[modalType].schema),
  });
  const onSubmit: SubmitHandler<ModalFormData<typeof modalType>> = (data) => {
    console.log("[data]:", data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{MODAL_CONFIG[modalType].title}</DialogTitle>
        <DialogDescription>
          {MODAL_CONFIG[modalType].description}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {MODAL_CONFIG[modalType].fields.map((config) => (
              <FormField
                key={config.name}
                name={config.name}
                control={form.control}
                render={({ field, fieldState }) => {
                  console.log("[field]:", field, fieldState);
                  return (
                    <FormItem>
                      <FormLabel>{config.label}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            ))}
            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <>
                  <Button type="button" variant="secondary" className="mr-2">
                    닫기
                  </Button>
                  <Button type="submit">확인하기</Button>
                </>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </>
  );
}

export default ModalForm;
