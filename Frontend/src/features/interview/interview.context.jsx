import { createContext, useCallback, useContext, useState } from "react";
import {
	downloadResumePdf,
	generateInterviewReport,
	getAllInterviewReports,
	getInterviewReportById,
} from "./services/interview.api";

const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {
	const [report, setReport] = useState(null);
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(false);
	const [historyLoading, setHistoryLoading] = useState(false);

	const generateReport = async (formData) => {
		setLoading(true);
		try {
			const data = await generateInterviewReport(formData);
			setReport(data.interviewReport);
			setHistory((current) => [data.interviewReport, ...current]);
			return data.interviewReport;
		} finally {
			setLoading(false);
		}
	};

	const loadHistory = useCallback(async () => {
		setHistoryLoading(true);
		try {
			const data = await getAllInterviewReports();
			setHistory(data.interviewReports || []);
		} finally {
			setHistoryLoading(false);
		}
	}, []);

	const getReportById = useCallback(async (interviewId) => {
		setLoading(true);
		try {
			const data = await getInterviewReportById(interviewId);
			setReport(data.interviewReport);
			return data.interviewReport;
		} finally {
			setLoading(false);
		}
	}, []);

	return (
		<InterviewContext.Provider value={{
			report,
			history,
			loading,
			historyLoading,
			generateReport,
			loadHistory,
			getReportById,
			getResumePdf: downloadResumePdf,
		}}>
			{children}
		</InterviewContext.Provider>
	);
};

export const useInterviewContext = () => useContext(InterviewContext);
