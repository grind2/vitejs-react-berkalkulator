import { useState } from 'react';
import FamilyMemberTabs from './FamilyMemberTabs/FamilyMemberTabs';
import HouseholdSummary from './HouseholdSummary/HouseholdSummary';
import SalaryCalculator from './SalaryCalculator/SalaryCalculator';

const HouseholdSalaryCalculator = () => {
  const [tabtext, setTabText] = useState([
    ['Bendi', 0],
    ['Tamás', 0],
  ]);
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <main className="h-screen flex items-center justify-center">
        <SalaryCalculator
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabtext={tabtext}
          setTabText={setTabText}
        />
        <HouseholdSummary
          setCurrentTab={setCurrentTab}
          tabtext={tabtext}
          setTabText={setTabText}
        />
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;
