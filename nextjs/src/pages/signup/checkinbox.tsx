import Layout from "@/components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { Context } from "@/context/Context";
import Link from "next/link";

const PERIOD_TO_DISABLE_EMAIL_VERIFICATION_BUTTON_AFTER_USE_MS = 60000;

export default function Signup() {
  const { user, backend, addToast } = useContext(Context);
  const [disableEmailVerificationButton, setDisableEmailVerificationButton] =
    useState(false);

  const sendEmail = async () => {
    if (user && !disableEmailVerificationButton) {
      try {
        await backend.sendEmailVerification(user);
        setDisableEmailVerificationButton(true);
        setTimeout(
          () => setDisableEmailVerificationButton(false),
          PERIOD_TO_DISABLE_EMAIL_VERIFICATION_BUTTON_AFTER_USE_MS
        );
        addToast("Your confirmation link has been sent", "success");
      } catch (ex) {
        addToast(
          "Your confirmation link could not be sent, please try again later. Sorry.",
          "danger"
        );
      }
    }
  };

  return (
    <>
      <Layout>
        <div className="m-auto max-w-3xl mt-20 text-center">
          <div className="flex items-center gap-10">
            <h1 className="title text-left">Check your inbox, please!</h1>
            <FontAwesomeIcon size="10x" color="indigo" icon={faEnvelope} />
          </div>
          <p className="text-left mt-10">
            To complete sign up, open the email we have sent you, and click the
            confirmation link. When you have done this, <Link className="anchor" href="/">click here to return to the home page.</Link>
          </p>
          {user && (
            <button
              className={`button blue mt-10 ${disableEmailVerificationButton ? "disabled" : ""}`}
              onClick={sendEmail}
              disabled={disableEmailVerificationButton}
            >
              <FontAwesomeIcon
                className="mr-2"
                color="white"
                icon={faEnvelope}
              />
              {disableEmailVerificationButton
                ? "Try again in 60s"
                : "Send confirmation email again"}
            </button>
          )}
        </div>
      </Layout>
    </>
  );
}
