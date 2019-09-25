import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import StageOne from "./StageOne";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";
import Finished from "./Finished";

const Register = () => {
  const [step, setStep] = useState(0);

  const completeStage = index => () => setStep(index + 1);

  return (<div>Register
    <Stepper activeStep={step}>
      <Step>
        <StepLabel>Member Details</StepLabel>
      </Step>
      <Step>
        <StepLabel>Create Account</StepLabel>
      </Step>
      <Step>
        <StepLabel>Payment</StepLabel>
      </Step>
    </Stepper>

    {step === 0 && <StageOne onComplete={completeStage(0)} />}
    {step === 1 && <StageTwo onComplete={completeStage(1)} />}
    {step === 2 && <StageThree onComplete={completeStage(2)} />}
    {step > 2 && <Finished />}
  </div>);
};

export default Register;
