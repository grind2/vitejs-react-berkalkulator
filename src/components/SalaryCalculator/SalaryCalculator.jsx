import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabsCustomContent from './components/TabsCustomContent';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const SalaryCalculator = ({
  tabtext,
  setTabText,
  currentTab,
  setCurrentTab,
}) => {
  return (
    <>
      <Tabs value={currentTab} className="w-[600px]">
        <TabsList className="grid w-full grid-cols-5">
          {tabtext.map((item, index) => (
            <TabsTrigger key={index} value={index}>
              <a onClick={() => setCurrentTab(index)}>{tabtext[index][0]}</a>
            </TabsTrigger>
          ))}

          <Button
            onClick={() => {
              if (tabtext.length < 4) {
                var local = [...tabtext];
                local.push(['valaki', 1]);
                setTabText(local);
              }
            }}
          >
            +
          </Button>
        </TabsList>
        <TabsContent value={currentTab}>
          {tabtext.map((item, index) => (
            <TabsCustomContent
              key={index}
              v={index}
              getter={tabtext}
              setter={setTabText}
            ></TabsCustomContent>
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SalaryCalculator;
