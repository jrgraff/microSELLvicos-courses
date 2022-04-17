import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";

import {
  getServerPageGetProducts,
  ssrGetProducts,
} from "../../graphql/generated/page";
import { withApollo } from "../../lib/withApollo";

function Home(props) {
  const { user } = useUser();

  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    console.log(getAccessToken(ctx.req, ctx.res));

    return getServerPageGetProducts(null, ctx);
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
