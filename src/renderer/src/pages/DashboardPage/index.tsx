import React, { useState } from "react";
import type { IRsaData } from "@/pages/DashboardPage/types";
import Card from "@/components/Card/Card";
import DashboardDecrypt from "@/pages/DashboardPage/DashboardDecrypt";
import DashboardEncrypt from "@/pages/DashboardPage/DashboardEncrypt";
import DashboardForm from "@/pages/DashboardPage/DashboardForm";

const DashboardPage = () => {
  const [rsaData, setRsaData] = useState<IRsaData>({
    mValue: 0,
    eValue: 0,
    pValue: 0,
    phiValue: 0,
    nValue: 0,
    dValue: 0,
    qValue: 0,
  });

  const [cResult, setCResult] = useState(0);

  return (
    <>
      <Card>
        <Card.Header>Dane</Card.Header>
        <Card.Body>
          <DashboardForm setRsaData={(data: IRsaData) => setRsaData(data)} />
        </Card.Body>
      </Card>
      {!!rsaData.mValue && !!rsaData.eValue && !!rsaData.nValue && (
        <Card cardContainerClass="mt-4">
          <Card.Header>Szyfrowanie</Card.Header>
          <Card.Body>
            <DashboardEncrypt
              mValue={rsaData.mValue}
              eValue={rsaData.eValue}
              nValue={rsaData.nValue}
              setCResult={(data: number) => setCResult(data)}
            />
          </Card.Body>
        </Card>
      )}
      {!!cResult && !!rsaData.dValue && !!rsaData.nValue && (
        <Card cardContainerClass="mt-4">
          <Card.Header>Deszyfrowanie</Card.Header>
          <Card.Body>
            <DashboardDecrypt
              cResult={cResult}
              dValue={rsaData.dValue}
              nValue={rsaData.nValue}
            />
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default DashboardPage;
