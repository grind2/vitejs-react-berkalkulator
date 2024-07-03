"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
import Eligible from "./Eligible"
import { Button } from "@/components/ui/button"

export default function FreshMarriage({sendDataToParent, eli, dateFromCalc}) {

  return (
    <>
       
        
        <AlertDialog>
            <Button asChild>
                <AlertDialogTrigger>Válassz dátumot</AlertDialogTrigger>
            </Button>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogDescription>
                    blablabla
                    házasságkötés dátuma:
                </AlertDialogDescription>
                </AlertDialogHeader>
                <input type="date" value={dateFromCalc.toISOString().split('T')[0]} onChange={(event) => sendDataToParent(new Date(Date.parse(event.target.value)))}/>
                <AlertDialogFooter>
                <AlertDialogAction>OK</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <Eligible prop={eli}></Eligible>
        
    </>
    
  )
}
