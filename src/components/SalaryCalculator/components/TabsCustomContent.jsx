import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import NameInput from './NameInput';
import WageInput from './WageInput';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import FreshMarriage from './FreshMarriage';
import FamilyDiscount from './FamilyDiscount';
import { useEffect, useState } from 'react';

function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months;
}

export default function TabsCustomContent({ v, getter, setter }) {
  const [marriageswitch, setMarriageswitch] = useState(false);
  const [familyswitch, setFamilyswitch] = useState(false);
  const [szjafree, setSzjafree] = useState(false);
  const [personal, setPersonal] = useState(false);

  const [sliderState, setSliderState] = useState(50);
  const [name, setName] = useState(getter[v][0]);
  const [wage, setWage] = useState(0);
  const [date, setDate] = useState(new Date());
  const [eligible, setEligible] = useState(false);
  const [netwage, setNetwage] = useState(0);
  const [typedwage, setTypedwage] = useState(0);

  const [discounted, setDiscounted] = useState(0);
  const [nondiscounted, setNondiscounted] = useState(0);

  //setname new
  useEffect(() => {
    var arr = [...getter];
    arr[v] = [name, netwage];
    setter(arr);
  }, [name, netwage]);

  useEffect(() => {
    var v = monthDiff(date, new Date());
    setEligible(0 < v && v < 25);
  }, [date]);

  useEffect(() => {
    setWage(((sliderState - 50) * 0.01 + 1) * typedwage);
  }, [sliderState]);

  useEffect(() => {
    setSliderState(50);
    setWage(typedwage);
  }, [typedwage]);

  useEffect(() => {
    var wageAfterSZJATB =
      wage *
        0.815 * //TB
        (!szjafree ? 0.85 : 1) - //SZJA
      (szjafree && wage > 499952 ? (wage - 499952) * 0.15 : 0); //SZJA for under 25

    // Személyi adókedvezmény
    var personalAmount = 0;
    if (personal) {
      var taxes = wage - wageAfterSZJATB;
      personalAmount = taxes > 77300 ? 77300 : taxes;
    }

    var familydiscount = 0;
    if (familyswitch)
      switch (discounted) {
        case 1:
          familydiscount = 10000 * nondiscounted;
          break;
        case 2:
          familydiscount = 20000 * nondiscounted;
          break;
        case 3:
          familydiscount = 33000 * nondiscounted;
          break;
        default:
          familydiscount = 0; // just in case
      }

    setNetwage(
      wageAfterSZJATB +
        personalAmount +
        (eligible && marriageswitch ? 5000 : 0) +
        familydiscount
    );
  }, [
    wage,
    szjafree,
    personal,
    eligible,
    marriageswitch,
    discounted,
    nondiscounted,
    familyswitch,
  ]);

  return (
    <>
      <TabsContent value={v}>
        <Card>
          <CardHeader>
            <CardTitle>{name} bérének kiszámítása</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1"></div>
            <div className="space-y-1">
              <NameInput sendDataToParent={setName} name={name}></NameInput>
              <WageInput w={wage} sendDataToParent={setTypedwage}></WageInput>
              <Slider
                value={[sliderState]}
                onValueChange={(e) => setSliderState(e[0])}
                max={100}
                step={1}
              />
              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  onClick={() =>
                    sliderState >= 5 && setSliderState(sliderState - 5)
                  }
                >
                  -5%
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    sliderState >= 1 && setSliderState(sliderState - 1)
                  }
                >
                  -1%
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    sliderState <= 99 && setSliderState(sliderState + 1)
                  }
                >
                  +1%
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    sliderState <= 95 && setSliderState(sliderState + 5)
                  }
                >
                  +5%
                </Button>
              </div>
            </div>

            <ul>
              <li>
                <Label>KEDVEZMÉNYEK</Label>
              </li>
              <li>
                <Switch id="szjafree" onCheckedChange={(e) => setSzjafree(e)} />
                <Label htmlFor="szjafree">25 év alattiak SZJA mentessége</Label>
              </li>
              <li>
                <Switch
                  id="hazasok"
                  onCheckedChange={(e) => setMarriageswitch(e)}
                />
                <Label htmlFor="hazasok">Friss házasok kedvezménye</Label>

                {marriageswitch && (
                  <FreshMarriage
                    eli={eligible}
                    dateFromCalc={date}
                    sendDataToParent={setDate}
                  ></FreshMarriage>
                )}
              </li>
              <li>
                <Switch id="personal" onCheckedChange={(e) => setPersonal(e)} />
                <Label htmlFor="personal">Személyi adókedvezmény</Label>
              </li>
              <li>
                <Switch
                  id="csaladi"
                  onCheckedChange={(e) => setFamilyswitch(e)}
                />
                <Label htmlFor="csaladi">Családi kedvezmény</Label>
                {familyswitch && (
                  <FamilyDiscount
                    n={name}
                    d={discounted}
                    sd={setDiscounted}
                    nd={nondiscounted}
                    snd={setNondiscounted}
                  ></FamilyDiscount>
                )}
              </li>
            </ul>
          </CardContent>

          <div className="grid">
            <Button id="netwage" variant="secondary">
              Nettó bér: {netwage}Ft
            </Button>

            <Button
              variant="destructive"
              onClick={() => {
                var local = [...getter];
                local.splice(v, 1);

                setter(local);
              }}
            >
              Személy törlése
            </Button>
          </div>
        </Card>
      </TabsContent>
    </>
  );
}
