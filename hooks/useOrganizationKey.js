import { usePromiseResult, useCache, useAuthentication, useUser, useApi } from 'react-components';
import { getKeys } from 'pmcrypto';
import { noop } from 'proton-shared/lib/helpers/function';
import { getOrganizationKeys } from 'proton-shared/lib/api/organization';

import { cachedPromise } from './helpers/cachedPromise';

const useOrganizationKey = (organization) => {
    const cache = useCache();
    const authentication = useAuthentication();
    const api = useApi();
    const [user] = useUser();

    return usePromiseResult(() => {
        if (!user.isAdmin || !organization) {
            return Promise.resolve();
        }
        // Warning: There is no event update coming for organization key changes, however, an update for the organization
        // is received as the keys are changed. So each time it changes, it will redo this.
        return cachedPromise(
            cache,
            'ORGANIZATION_KEY',
            async () => {
                const { PrivateKey } = await api(getOrganizationKeys());
                if (!PrivateKey) {
                    return;
                }
                const [privateKey] = await getKeys(PrivateKey);
                await privateKey.decrypt(authentication.getPassword()).catch(noop);
                return privateKey;
            },
            organization
        );
    }, [user, organization]);
};

export default useOrganizationKey;
