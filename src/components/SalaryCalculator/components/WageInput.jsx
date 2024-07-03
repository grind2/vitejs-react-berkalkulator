import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardDescription } from "@/components/ui/card"


export default function WageInput({ sendDataToParent, w }) {
    return (
        <>
        <Label htmlFor="wage">Bruttó bér</Label>
        <Input type="number" id="wage" value={w} placeholder="0 Ft" onChange={e => sendDataToParent(e.target.value)}/>
        <CardDescription>
          Add meg a bruttó béred!
        </CardDescription>
        </>
    )

}
