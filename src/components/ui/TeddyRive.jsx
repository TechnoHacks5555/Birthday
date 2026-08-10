import { forwardRef, useImperativeHandle, useRef } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

// Confirmed from the community editor URL: artboard "Teddy", state machine "Login Machine".
const STATE_MACHINE_NAME = "Login Machine";

// TODO: put your .riv file at public/rive/login-teddy.riv, or update this path.
const RIVE_SRC = "/intro/login-teddy.riv";

/**
 * Rive teddy bear used on the Splash password screen.
 * Exposes imperative controls via ref so parent components don't need
 * to know anything about Rive's input API:
 *
 *   const teddyRef = useRef(null);
 *   <TeddyRive ref={teddyRef} />
 *   teddyRef.current.fireFail();      // wrong digit
 *   teddyRef.current.fireSuccess();   // full password entered
 *   teddyRef.current.raiseHands();    // correct digit, quick celebration
 *   teddyRef.current.setChecking(true/false);
 *   teddyRef.current.setNumLook(3);   // 0-9, eyes track the digit
 */
const TeddyRive = forwardRef(function TeddyRive(
  { size = 120, className = "" },
  ref
) {
  const { rive, RiveComponent } = useRive({
    src: RIVE_SRC,
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    onLoad: () => {
      if (import.meta.env.DEV) {
        console.log("[TeddyRive] state machine contents:", rive?.contents);
      }
    },
  });

  const isCheckingInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "isChecking");
  const isCheckingAlt = useStateMachineInput(rive, STATE_MACHINE_NAME, "checking");
  const isChecking = isCheckingInput || isCheckingAlt;

  const numLookInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "numLook");
  const numLookAlt = useStateMachineInput(rive, STATE_MACHINE_NAME, "look");
  const numLook = numLookInput || numLookAlt;

  const handsUpBoolInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "isHandsUp");
  const handsUpBoolAlt = useStateMachineInput(rive, STATE_MACHINE_NAME, "handsUp");
  const handsUpBoolAlt2 = useStateMachineInput(rive, STATE_MACHINE_NAME, "Hands_up");
  const handsUpBool = handsUpBoolInput || handsUpBoolAlt || handsUpBoolAlt2;

  const handsUpTriggerInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "handsUpTrigger");
  const handsUpTriggerAlt = useStateMachineInput(rive, STATE_MACHINE_NAME, "hands_up");
  const handsUpTriggerAlt2 = useStateMachineInput(rive, STATE_MACHINE_NAME, "Hands_up");
  const handsUpTrigger = handsUpTriggerInput || handsUpTriggerAlt || handsUpTriggerAlt2;

  const trigSuccessInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "trigSuccess");
  const trigSuccessAlt = useStateMachineInput(rive, STATE_MACHINE_NAME, "success");
  const trigSuccess = trigSuccessInput || trigSuccessAlt;

  const trigFailInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "trigFail");
  const trigFailAlt = useStateMachineInput(rive, STATE_MACHINE_NAME, "fail");
  const trigFail = trigFailInput || trigFailAlt;

  const handsUpTimeout = useRef(null);

  const raiseHands = () => {
    if (handsUpTrigger?.fire) {
      handsUpTrigger.fire();
      return;
    }

    if (handsUpBool) {
      handsUpBool.value = true;
      clearTimeout(handsUpTimeout.current);
      handsUpTimeout.current = setTimeout(() => {
        if (handsUpBool) {
          handsUpBool.value = false;
        }
      }, 2000);
      return;
    }

    if (import.meta.env.DEV) {
      console.warn('[TeddyRive] No hand-raise input found on this state machine.');
    }
  };

  useImperativeHandle(ref, () => ({
    fireFail() {
      if (!trigFail && import.meta.env.DEV) {
        console.warn('[TeddyRive] "trigFail" input not found on this state machine.');
      }
      trigFail?.fire();
    },
    fireSuccess() {
      if (!trigSuccess && import.meta.env.DEV) {
        console.warn('[TeddyRive] "trigSuccess" input not found on this state machine.');
      }
      trigSuccess?.fire();
      raiseHands();
    },
    raiseHands,
    setChecking(value) {
      if (isChecking) isChecking.value = value;
    },
    setNumLook(value) {
      if (numLook) numLook.value = value;
    },
  }));

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-full ${className}`}
      style={{
        width: size + 12,
        height: size + 12,
        background: "radial-gradient(circle at 35% 30%, #FFF6FA 0%, #FFE3EC 75%)",
        border: "5px solid #FFFBF7",
        boxShadow: "0 12px 30px rgba(255,143,171,0.35)",
      }}
    >
      <RiveComponent style={{ width: size, height: size }} />
    </div>
  );
});

export default TeddyRive;