import Head from "next/head";
import { type PropsWithChildren } from "react";

import { PageWrapper } from "./PageWrapper";
import { Container } from "./Container";
interface Props {
  title: string;
}
export const PageLayout = ({ title, children }: PropsWithChildren<Props>) => (
  <>
    <Head>
      <title>{title}</title>
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
