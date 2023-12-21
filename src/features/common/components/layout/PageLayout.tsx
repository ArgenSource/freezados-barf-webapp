import Head from "next/head";
import { type PropsWithChildren } from "react";

import { PageWrapper } from "./PageWrapper";
import { Container } from "./Container";

interface Props {
  headTitle: string;
}

export const PageLayout = ({
  headTitle,
  children,
}: PropsWithChildren<Props>) => (
  <>
    <Head>
      <title>{headTitle}</title>
      <meta
        name="description"
        content="App para gestionar tiempos de freezado en dietas BARF"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <PageWrapper>
      <Container>{children}</Container>
    </PageWrapper>
  </>
);
