import axios from "axios";

const BASE_URI = "http://localhost:3000";

const requestConfig = {
	withCredentials: true,
};

export async function generateInterviewReport({ jobDescription, selfDescription, resume }) {
	const formData = new FormData();
	formData.append("jobDescription", jobDescription);
	formData.append("selfDescription", selfDescription);
	formData.append("resume", resume);

	const response = await axios.post(`${BASE_URI}/api/interview`, formData, requestConfig);
	return response.data;
}

export async function getAllInterviewReports() {
	const response = await axios.get(`${BASE_URI}/api/interview`, requestConfig);
	return response.data;
}

export async function getInterviewReportById(interviewId) {
	const response = await axios.get(`${BASE_URI}/api/interview/report/${interviewId}`, requestConfig);
	return response.data;
}

export async function downloadResumePdf(interviewReportId) {
	const response = await axios.post(
		`${BASE_URI}/api/interview/resume/pdf/${interviewReportId}`,
		{},
		{ ...requestConfig, responseType: "blob" },
	);

	const url = URL.createObjectURL(response.data);
	const link = document.createElement("a");
	link.href = url;
	link.download = `nexamind-resume-${interviewReportId}.pdf`;
	document.body.appendChild(link);
	link.click();
	link.remove();
	URL.revokeObjectURL(url);
}
