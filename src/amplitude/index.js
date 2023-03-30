import * as amplitude from '@amplitude/analytics-browser';

const API_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY;

amplitude.init(API_KEY,
                undefined, 
                { defaultTracking: { sessions: true, pageViews: true, formInteractions: true, fileDownloads: true }});

export default amplitude