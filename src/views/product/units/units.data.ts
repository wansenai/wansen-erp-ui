import {FormSchema} from "@/components/Form";
import {BasicColumn} from "@/components/Table";
import { h } from 'vue';
import {Switch} from "ant-design-vue";
import {useMessage} from "@/hooks/web/useMessage";
import {updateStatus} from "@/api/sys/user";
import {useI18n} from "@/hooks/web/useI18n";


const { t } = useI18n();
export const columns: BasicColumn[] = [
    {
        title: '计量单位',
        dataIndex: 'computeUnit',
        width: 100,
    },
    {
        title: '基本单位',
        dataIndex: 'basicUnit',
        width: 150,
    },
    {
        title: '副单位',
        dataIndex: 'otherUnit',
        width: 80,
    },
    {
        title: '副单位二',
        dataIndex: 'otherUnitTwo',
        width: 150,
    },
    {
        title: '副单位三',
        dataIndex: 'otherUnitThree',
        width: 150,
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 150,
        customRender: ({ record }) => {
            if (!Reflect.has(record, 'pendingStatus')) {
                record.pendingStatus = false;
            }
            return h(Switch, {
                checked: record.status === 0,
                checkedChildren: t('common.on'),
                unCheckedChildren: t('common.off'),
                loading: record.pendingStatus,
                onChange(checked, _) {
                    const {createMessage} = useMessage();
                    if (record.id == 1) {
                        createMessage.warn(t('common.notice'));
                        return;
                    }
                    record.pendingStatus = true;
                    const newStatus = checked ? 0 : 1;
                    updateStatus({id: record.id, status: newStatus} )
                        .then(() => {
                            record.status = newStatus;
                        })
                        .finally(() => {
                            record.pendingStatus = false;
                        });
                },
            });
        }
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 150,
    }
]

export const searchFormSchema: FormSchema[] = [
    {
        label: '计量单位',
        field: 'computeUnit',
        component: 'Input',
        colProps: { span: 8 },
    },
]

export const formSchema: FormSchema[] = [
    {
        label: '单位id',
        field: 'id',
        show: false,
        component: 'Input',
    },
    {
        label: '基本单位',
        field: 'basicUnit',
        component: 'Input',
        required: true,
    },
    {
        label: '副单位',
        helpMessage: '多个属性值用|隔开',
        field: 'otherUnit',
        component: 'Input',
        required: true,
    },
    {
        label: '副单位比例',
        field: 'ratio',
        component: 'Input',
        required: true,
    },
    {
        label: '副单位二',
        field: 'otherUnitTwo',
        component: 'Input',
    },
    {
        label: '副单位二比例',
        field: 'ratioTwo',
        component: 'Input',
    },
    {
        label: '副单位三',
        field: 'otherUnitThree',
        component: 'Input',
    },
    {
        label: '副单位二比例',
        field: 'ratioThree',
        component: 'Input',
    }
]