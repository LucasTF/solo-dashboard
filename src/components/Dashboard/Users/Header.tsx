import { usersStructure } from "@/lib/structures";
import { UsersSearch } from "./Search";

import { BaseHeader } from "../BaseHeader";

export const UsersHeader = () => {
  return (
    <BaseHeader title="Usuários">
      <UsersSearch tableStructure={usersStructure} />
    </BaseHeader>
  );
};
