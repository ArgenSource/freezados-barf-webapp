import { AuthShowcase } from "~/features/auth/AuthShowcase";
import { PageLayout, Container } from "~/features/common/components/layout";
import { CreateSpaceLink } from "~/features/space/components/CreateSpaceLink";
import { SpaceList } from "~/features/space/components/SpaceList";

export default function Home() {
  return (
    <PageLayout headTitle="Freezados BARF">
      <AuthShowcase />
      <Container>
        <h1 className="mb-6 text-center text-6xl font-bold">Freezados BARF</h1>
        <SpaceList />
        <CreateSpaceLink />
      </Container>
    </PageLayout>
  );
}
