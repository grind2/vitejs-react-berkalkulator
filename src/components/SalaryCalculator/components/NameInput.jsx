import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardDescription } from "@/components/ui/card"


export default function NameInput({ sendDataToParent, name }) {

    return (
        <>
        <Label htmlFor="name">Családtag neve</Label>
        <Input id="name" value={name} onChange={e => sendDataToParent(e.target.value)}/>
        <CardDescription>
          Add meg a családtag nevét!
        </CardDescription>
        </>
    )
}
