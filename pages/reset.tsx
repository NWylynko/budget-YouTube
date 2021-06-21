import { reset } from "../Database/tools/reset";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Cookies from "js-cookie"

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    await reset();
  } catch (error) {
    return {
      props: { error },
    };
  }

  return {
    props: { result: { done: "success" } }, // will be passed to the page component as props
  };
};

export default function ResetPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  Cookies.remove("userId")

  return (
    <>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  );
}
