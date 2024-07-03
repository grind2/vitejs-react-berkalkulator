import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useEffect } from 'react';

const HouseholdSummary = ({ tabtext, setCurrentTab }) => {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    let total = 0;
    tabtext.forEach((item) => {
      total += item[1];
    });
    setSum(total);
  }, [tabtext]);

  return (
    <Table>
      <TableCaption className="font-bold text-xl">
        Összesen: {sum} Ft
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Családtag</TableHead>
          <TableHead>Nettó bér</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tabtext.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <a
                onClick={() => {
                  setCurrentTab(index);
                }}
              >
                {item[0]}
              </a>
            </TableCell>
            <TableCell>{item[1]} Ft</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HouseholdSummary;
