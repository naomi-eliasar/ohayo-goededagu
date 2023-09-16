import type {
  DeleteUserActionMutationVariables,
  FindUserActions,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DisplayDatetime from 'src/components/DisplayDatetime/DisplayDatetime'
import { QUERY } from 'src/components/UserAction/UserActionsCell'
import { formatEnum, truncate } from 'src/lib/formatters'

const DELETE_USER_ACTION_MUTATION = gql`
  mutation DeleteUserActionMutation($id: Int!) {
    deleteUserAction(id: $id) {
      id
    }
  }
`

const UserActionsList = ({ userActions }: FindUserActions) => {
  const [deleteUserAction] = useMutation(DELETE_USER_ACTION_MUTATION, {
    onCompleted: () => {
      toast.success('UserAction deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteUserActionMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete userAction ' + id + '?')) {
      deleteUserAction({ variables: { id } })
    }
  }

  const getUserName = (user) => {
    return user.profile?.name || user.email
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>User id</th>
            <th>Action</th>
            <th>Target</th>
            <th>Target id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {userActions.map((userAction) => (
            <tr key={userAction.id}>
              <td>{truncate(userAction.id)}</td>
              <td>
                <DisplayDatetime datetime={userAction.createdAt} showDate />
              </td>
              <td>
                <Link
                  to={
                    userAction.user.profile
                      ? routes.profile({
                          id: userAction.user.profile.id,
                        })
                      : routes.userAction({ id: userAction.id })
                  }
                  title={'Show user ' + userAction.userId + ' detail'}
                  className="text-blue-500 hover:text-blue-800"
                >
                  {getUserName(userAction.user)}
                </Link>
              </td>
              <td>{formatEnum(userAction.action)}</td>
              <td>{truncate(userAction.target)}</td>
              <td>{truncate(userAction.targetId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.userAction({ id: userAction.id })}
                    title={'Show userAction ' + userAction.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <button
                    type="button"
                    title={'Delete userAction ' + userAction.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(userAction.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserActionsList