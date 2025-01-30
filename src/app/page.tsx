"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import ModalForm, { ModalType } from "./features/home/ModalForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Home() {
  const [modalType, setModalType] = useState<ModalType>(null);

  return (
    <Card className="h-screen flex flex-col justify-center align-center">
      <CardHeader className="text-center object-center">
        <CardTitle>Encar X BBL 관리</CardTitle>
        <CardDescription>BBL관리 사이트입니다.</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button onClick={() => setModalType("profile")} className="mr-2">
          회원정보 확인
        </Button>
        <Button onClick={() => setModalType("login")}>로그인</Button>
        <Dialog
          open={modalType !== null}
          onOpenChange={() => setModalType(null)}
        >
          <DialogContent>
            {modalType && <ModalForm modalType={modalType} />}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
