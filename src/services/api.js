import request from './../utils/request';

export async function getOverview(reportKey) {
    return request(`/api/task/summary_report/${reportKey}/overview/`);
}