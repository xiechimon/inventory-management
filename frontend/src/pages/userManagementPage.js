import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, removeUser, RESET_USER_STATE } from '../redux/features/user/userSlice';
import { selectUser } from '../redux/features/auth/authSlice';
import Header from '../components/common/Header';
import { motion } from 'framer-motion';
import { Users, Trash2, Search, UserCheck, Shield } from 'lucide-react';
import { toast } from 'react-toastify';
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const UserManagementPage = () => {
  useRedirectLoggedOutUser("/auth");
  
  const dispatch = useDispatch();
  const { users, isLoading, isError, message } = useSelector((state) => state.user);
  const currentUser = useSelector(selectUser);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // 检查当前用户是否为admin
  useEffect(() => {
    if (currentUser && currentUser.name === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  // 获取所有用户
  useEffect(() => {
    dispatch(getUsers());

    return () => {
      dispatch(RESET_USER_STATE());
    };
  }, [dispatch]);

  // 处理错误
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  // 删除用户确认
  const confirmDelete = (id) => {
    confirmAlert({
      title: '确认删除',
      message: '您确定要删除这个用户吗？此操作不可撤销。',
      buttons: [
        {
          label: '删除',
          onClick: () => deleteUser(id)
        },
        {
          label: '取消',
          onClick: () => null
        }
      ]
    });
  };

  // 删除用户
  const deleteUser = async (id) => {
    await dispatch(removeUser(id));
    dispatch(getUsers());
  };

  // 过滤用户
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 排序用户：管理员始终在第一位，其他用户按注册时间倒序排列
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    // 管理员始终排在第一位
    if (a.name === 'admin') return -1;
    if (b.name === 'admin') return 1;
    
    // 其他用户按注册时间倒序排列
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="用户管理" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Users className="text-blue-600 mr-4" size="24" />
              <h2 className="text-xl font-semibold text-gray-900">用户管理</h2>
            </div>
            
            
          </div>

          {/* 搜索框 */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索用户..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* 用户统计 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-blue-800">总用户数</h3>
                <div className="p-2 bg-blue-100 rounded-full">
                  <Users size={16} className="text-blue-600" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold text-blue-600">{users.length}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-green-800">活跃用户</h3>
                <div className="p-2 bg-green-100 rounded-full">
                  <UserCheck size={16} className="text-green-600" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold text-green-600">{users.length}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-purple-800">管理员</h3>
                <div className="p-2 bg-purple-100 rounded-full">
                  <Shield size={16} className="text-purple-600" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold text-purple-600">
                {users.filter(user => user.name === 'admin').length}
              </p>
            </div>
          </div>

          {/* 用户列表 */}
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用户
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    邮箱
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    电话
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    注册时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    角色
                  </th>
                  {isAdmin && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 5} className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">加载中...</p>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 5} className="px-6 py-4 text-center text-sm text-gray-500">
                      没有找到用户
                    </td>
                  </tr>
                ) : (
                  sortedUsers.map((user) => (
                    <motion.tr 
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src={user.photo} alt={user.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            {user.name === 'admin' && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                管理员
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.phone || "未设置"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleString('zh-CN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.name === 'admin' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                            管理员
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            普通用户
                          </span>
                        )}
                      </td>
                      {isAdmin && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {user.name !== 'admin' && user.name !== currentUser.name ? (
                            <button
                              onClick={() => confirmDelete(user._id)}
                              className="text-red-600 hover:text-red-900 flex items-center"
                            >
                              <Trash2 size={16} className="mr-1" />
                              删除
                            </button>
                          ) : (
                            <span className="text-gray-400 flex items-center">
                              <Shield size={16} className="mr-1" />
                              {user.name === 'admin' ? '管理员' : '当前用户'}
                            </span>
                          )}
                        </td>
                      )}
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default UserManagementPage;