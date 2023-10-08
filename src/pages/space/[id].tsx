import { useRouter } from "next/router";

import Container from "~/components/common/Container";
import Loader from "~/components/common/Loader";

import UbicationList from "~/components/ubication/UbicationList";

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
                    <>
                        <h1>{data?.name}</h1>
                        <UbicationList ubications={data?.ubications} />
                    </>}
                </Container>
            </main>
        </>
    )
}