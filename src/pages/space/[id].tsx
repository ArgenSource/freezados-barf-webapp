import { useRouter } from "next/router";

import { api } from "~/utils/api";

export default function Space() {
    const router = useRouter();
    const spaceId = router.query.id?.toString() ?? '';
    const space = api.space.getByid.useQuery({ id: spaceId })

    return (
        <>
            <main>
                {space.status == "success" && 
                <section>
                    {space.data?.name}
                </section>}
            </main>
        </>
    )
}