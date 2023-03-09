import Link from "next/link";
import { Alert } from "./Alert";

export default function RequiresLoginNotice() {
  return (
    <div>
      <Alert level="warning">
        This page requires you to be signed in.{" "}
        You can either <Link className="anchor" href="/login">log in</Link> or,{" "}
        <Link className="anchor" href="/signup">sign up.</Link>
      </Alert>
    </div>
  );
}
