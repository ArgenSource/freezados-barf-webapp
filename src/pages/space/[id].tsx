import { useRouter } from "next/router";

import Container from "~/components/common/Container";
import Loader from "~/components/common/Loader";

import { api } from "~/utils/api";

export default function Space() {
    const router = useRouter();
    const { id: spaceId } = router.query;
    const { data, status } = api.space.getByid.useQuery({ id: spaceId as string }, {
        enabled: !!spaceId
    })

    return (
        <>
            <main>
                <Container>
                    {status == "loading" && <Loader />}
                    {status == "success" && 
                    <section>
                        {data?.name}
                    </section>}
                </Container>
            </main>
        </>
    )
}