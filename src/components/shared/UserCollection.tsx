import { IUser } from "@/lib/mongo/models/user.model"
import Link from "next/link"

type UserCollectionProps = {
  data: IUser[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'All_Users'

}

const UserCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName
}: UserCollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 xl:gap-10">
            {data.map((user) => {
              return (
                <li key={user._id} className="flex justify-center">
                  <div className="group relative flex w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg p-5">
                    <Link
                      href={`/users/${user._id}/update`}
                    >
                      <p className="p-semibold-18">
                        {user.lastName}, {user.firstName}
                      </p>
                      <p className="italic">
                        {user.username}
                      </p>
                      <p>
                        Role: {user.role}
                      </p>
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-gray-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  )
}

export default UserCollection