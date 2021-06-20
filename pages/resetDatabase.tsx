import { reset } from "../Database/tools/reset";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    await reset();
  } catch (error) {
    return {
      props: { error },
    };
  }

  return {
    props: { done: "success" }, // will be passed to the page component as props
  };
};

export default function HomePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  console.log(props);

  return (
    <>
      <pre>{props}</pre>
    </>
  );
}
