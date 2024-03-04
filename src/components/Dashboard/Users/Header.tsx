import { usersStructure } from "@/lib/structures";
import { UsersSearch } from "./Search";

import { BaseHeader } from "../BaseHeader";
import { NewUser } from "./Modals/NewUser";

export const UsersHeader = () => {
  return (
    <BaseHeader
      searchComponent={<UsersSearch tableStructure={usersStructure} />}
      newEntryButtonText="Novo usuário"
      newEntryModalComponent={<NewUser />}
      newEntryModalTitle="Novo Usuário"
    />
  );
};
