import { useRouter } from "next/router";

import { PageLayout } from "~/features/common/components/layout";

export default function SpaceHistory() {
  const router = useRouter();
  const { id: spaceId } = router.query;

  // TODO : ADD HISTORY TABLE
  return <PageLayout headTitle="Freezados - Add new ubication">...</PageLayout>;
}
