
import { useEffect, useState } from "react";
import type { CallBackProps, Step } from "react-joyride";
import Joyride, { EVENTS, STATUS } from "react-joyride";

interface State {
  run: boolean;
  stepIndex: number;
  steps: Step[];
}

interface TourGuideProps {
  start: boolean;
  setStartTour: (value: boolean) => void;
  onTourEnd: () => void;
}

const TourGuide = ({ start, setStartTour, onTourEnd }: TourGuideProps) => {
  const [progress, setProgress] = useState<number>(1);
  const totalSteps: number = 7;

  const generateSteps = (val: number): Step[] => [
    {
      content: (
        <div className="p-3">
          <p className="text-4xl">Axioma</p>
          
          <p className="mt-12 text-2xl font-bold">
            Analyze and Understand how efficiently your Newsroom operates
          </p>
          <p className="mt-6 mb-8 text-md">
            Walkthrough
          </p>
          <div className="mt-4 border-b border-sessionbutton-foreground" />
          <div className="absolute bottom-[34px] left-[47%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      locale: { skip: <strong aria-label="skip">Skip</strong> },
      styles: {
        options: {
          width: 700,
        },
      },
      placement: "center",
      target: "body",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Overview of Platform</p>
          <p className="mr-2 text-sm">
            Check the activity and trending topics at a glance
          </p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      target: "#step-1",
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Audience Insights</p>
          <p className="mr-2 text-sm">Understand you audience groups and their interests according to age groups</p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      target: "#step-2",
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Analyze Author Performances</p>
          <p className="mr-2 text-sm">
            Understand which Author carters to which age groups and their expertise in diverse topics.
          </p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "top",
      target: "#step-3",
      title: "",
    },
    {
        content: (
          <div className="mb-4 flex flex-col gap-4 px-2 text-left">
            <p className="mr-4 text-base font-bold">Identify Revenue Sources</p>
            <p className="mr-2 text-sm">
                Visualise how subscibers and non subscribers consume content and how revenue is generated
            </p>
            <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
              {val} of {totalSteps}
            </div>
          </div>
        ),
        styles: {
          options: {
            width: 380,
          },
        },
        placement: "top",
        target: "#step-4",
        title: "",
      },
      {
        content: (
          <div className="mb-4 flex flex-col gap-4 px-2 text-left">
            <p className="mr-4 text-base font-bold">Additional Features</p>
            <p className="mr-2 text-sm">
                Features to be added
            </p>
            <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
              {val} of {totalSteps}
            </div>
          </div>
        ),
        styles: {
          options: {
            width: 380,
          },
        },
        placement: "top",
        target: "#step-5",
        title: "",
      },
      {
        content: (
          <div className="mb-4 flex flex-col gap-4 px-2 text-left">
            <p className="mr-4 text-base font-bold">Conversational Chatbot</p>
            <p className="mr-2 text-sm">
                Ask queries, get relevant information and insights with source of truth available.

            </p>
            <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
              {val} of {totalSteps}
            </div>
          </div>
        ),
        styles: {
          options: {
            width: 380,
          },
        },
        placement: "top",
        target: "#step-6",
        title: "",
      },
  ];

  const [{ run, steps }, setState] = useState<State>({
    run: start,
    stepIndex: 0,
    steps: generateSteps(progress),
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      steps: generateSteps(progress),
    }));
  }, [progress]);

  useEffect(() => {
    if (start) {
      setState((prevState) => ({
        ...prevState,
        run: true,
        stepIndex: 0,
      }));
    }
  }, [start]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index } = data;

    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ steps, run: false, stepIndex: 0 });
      setStartTour(false);
      onTourEnd();
    } else if (([EVENTS.STEP_BEFORE] as string[]).includes(type)) {
      setProgress(index + 1);
    }
  };

  return (
    <Joyride
      continuous
      callback={handleJoyrideCallback}
      run={run}
      steps={steps}
      scrollToFirstStep
      hideCloseButton={true}
      disableCloseOnEsc
      disableOverlayClose
      spotlightPadding={5}
      // showProgress
      showSkipButton
      debug
      styles={{
        overlay: {
          border: "4px solid white p-1",
        },
        spotlight: {
          border: "2px solid white",
        },
        buttonClose: {
          marginTop: "5px",
          marginRight: "5px",
          width: "12px",
        },
        buttonNext: {
          outline: "2px solid transparent",
          outlineOffset: "2px",
          backgroundColor: "#FFFFFF",
          borderRadius: "5px",
          color: "#000000",
        },
        buttonSkip: {
          color: "A3A3A3",
        },
        tooltipFooter: {
          margin: "0px 16px 10px 10px",
        },
        buttonBack: {
          outline: "2px solid transparent",
          outlineOffset: "",
        },
        options: {
          zIndex: 100,
          arrowColor: "#1F1F1F",
          backgroundColor: "#1F1F1F",
          textColor: "#FFFFFF",
          overlayColor: "rgba(0, 0, 0, 0.9)",
          primaryColor: "#1c7bd4",
        },
      }}
      locale={{
        back: (
          <p className="font-bold focus:ring-transparent focus-visible:outline-none justify-start text-white">
            {`<-`}
          </p>
        ),
      }}
    />
  );
};

export default TourGuide;