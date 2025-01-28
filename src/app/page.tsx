"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type ModalType = "login" | "profile_check" | null;
interface FormData {
  employeeNumber: string;
  password: string;
  name: string;
}

export default function Home() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [formData, setFormData] = useState<FormData>({
    employeeNumber: "",
    password: "",
    name: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isNumericOnly: boolean = false
  ) => {
    const { id, value } = e.target;
    let processedValue = value;

    if (isNumericOnly) {
      processedValue = value.replace(/[^0-9]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [id]: processedValue,
    }));
  };
  const renderFormField = (
    id: keyof FormData,
    label: string,
    isNumericOnly: boolean = false
  ) => (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input
        id={id}
        value={formData[id]}
        onChange={(e) => handleInputChange(e, isNumericOnly)}
        className="col-span-3"
      />
    </div>
  );

  return (
    <Card className="h-screen flex flex-col justify-center align-center">
      <CardHeader className="text-center object-center">
        <CardTitle>Encar X BBL 관리</CardTitle>
        <CardDescription>BBL관리 사이트입니다.</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Dialog
          open={modalType !== null}
          onOpenChange={() => setModalType(null)}
        >
          <Button
            onClick={() => setModalType("profile_check")}
            className="mr-2"
          >
            회원정보 확인
          </Button>
          <Button onClick={() => setModalType("login")}>로그인</Button>
          <DialogContent>
            {modalType === "profile_check" && (
              <>
                <DialogHeader>회원정보 확인 모달</DialogHeader>
                <div className="grid gap-4 py-4">
                  {renderFormField("name", "이름")}
                  {renderFormField("employeeNumber", "사번", true)}
                </div>
              </>
            )}
            {modalType === "login" && (
              <>
                <DialogHeader>로그인 모달</DialogHeader>
                <DialogTitle>Title</DialogTitle>
                <div className="grid gap-4 py-4">
                  {renderFormField("employeeNumber", "사번", true)}
                  {renderFormField("password", "비밀번호")}
                </div>
              </>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  닫기
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
