import { Badge } from "@/components/ui/badge"

export default function Eligible({prop}) {
  return (
    <>
     {prop ? <Badge>Jogosult</Badge>
     : <Badge variant="destructive">Nem jogosult</Badge>}
    </>
  )
}
