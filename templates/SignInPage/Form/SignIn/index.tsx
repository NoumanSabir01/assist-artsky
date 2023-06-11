import { useEffect, useState } from "react";
import Field from "@/components/Field";
import { useRouter } from "next/router";
import { useSetLocalStorage } from "@/utils/useSetLocalStorage";
import { useGetLocalStorage } from "@/utils/useGetLocalStorage";
import useAuth from "@/utils/useAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firbase/firebase";
import { toast } from "react-hot-toast";
import Notify from "@/components/Notify";

type SignInProps = {
  onClick: () => void;
};

const SignIn = ({ onClick }: SignInProps) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();

  const onLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, name, password)
      .then((userCredential) => {
        // Signed in
        const user: any = userCredential.user;

        login(user.accessToken!);

        toast((t) => (
          <Notify iconCheck>
            <div className="ml-3 h6">Logged in successfully!</div>
          </Notify>
        ));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast((t) => (
          <Notify iconTimes>
            <div className="ml-3 h6">{errorMessage}</div>
          </Notify>
        ));
      });
  };

  return (
    <form onSubmit={onLogin}>
      <Field
        className="mb-4"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Username or email"
        icon="email"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        required
      />
      <Field
        className="mb-2"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Password"
        icon="lock"
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      />

      <button
        className="mb-6 base2 text-primary-1 transition-colors hover:text-primary-1/90"
        type="button"
        onClick={onClick}
      >
        Forgot password?
      </button>
      <button className="btn-blue btn-large w-full" type="submit">
        Sign in with Anomaly
      </button>
    </form>
  );
};

export default SignIn;
