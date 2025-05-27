export const IncidentTypeOptions = [
  { label: "Rail", value: "rail" },
  { label: "Bus", value: "bus" },
  { label: "Traffic", value: "traffic" },
  { label: "Project", value: "project" },
  { label: "Cyber", value: "cyber" },
  { label: "Others", value: "others" },
];

export const InitialReportOptions = [
  { label: "Start Date/Time", value: "startTime" },
  { label: "End Date/Time", value: "endTime" },
  { label: "Type", value: "incidentTypeName" },
  //other type name
  { label: "SubType", value: "incidentSubTypeName" },
  //other sub type name
  { label: "Brief Incident Description", value: "incidentDescription" },
  { label: "Severity(PTO)", value: "ptoIncidentLevel" },
  { label: "Severity(LTA)", value: "ltaIncidentLevel" },
  { label: "Escalated", value: "isEscalatedToMOT" },
];

export const LocationInformationOptions = [
  { label: "Start Location", value: "startLocation" },
  { label: "End Location", value: "endLocation" },
  { label: "Start Location Longitude", value: "startLocationLongitude" },
  { label: "Start Location Latitude", value: "startLocationLatitude" },
  { label: "Bound", value: "bound" },
  { label: "Location Type", value: "locationTypeName" },
  { label: "Location Details", value: "locationSubTypeName" },
  //other
  { label: "Location Description", value: "locationDescription" },
];

export const DetailedDescriptionOptions = [
  { label: "Additional Information", value: "additionalInformation" },
  { label: "Public Announcement Details", value: "publicAnnouncementDetails" },
  { label: "Impact on Service", value: "serviceImpact" },
  { label: "Details ofProperty Damage", value: "propertyDamage" },
  { label: "Bridging Buses Activated", value: "busesActivated" },
  { label: "Between Stations", value: "betweenStations" },
  { label: "Number Of Buses", value: "railIncident_NumberOfBuses" },
  { label: "Start Time", value: "detailsStartDateTime" },
  { label: "End Time", value: "detailsEndDateTime" },
  { label: "Reason for not activating ", value: "notActivatingReason" },

  { label: "Number of Fatalities", value: "numberOfFatalities" },
  { label: "Number of Injured", value: "numberOfInjured" },

  { label: "Media at Scene", value: "mediaAtScene" },
];

export const HospitalInfoOptions = [
  { label: "Extent of Injury", value: "hospitalInfoList.extentOfInjury" },
  {
    label: "Hospital Conveyed To",
    value: "hospitalInfoList.hospitalConveryedName",
  },
];

export const AgencyActivatedInfoOptions = [
  {
    label: "Agency Activation Date/Time",
    value: "agencyInfoList.activatedTime",
  },
  { label: "Agency Activated", value: "agencyInfoList.agencyTypeName" },
  { label: "Other Agency Activated", value: "agencyInfoList.otherAgencyType" },
];

export const ServiceResumptionInfoOptions = [
  { label: "Initial Delays (minutes)", value: "initialDelayMin" },
  { label: "Full Time Service Resumption", value: "fullTimeServiceResumption" },
  { label: "Duration of Incident(Minutes)", value: "incidentDuration" },
];

export const ServiceInfoOptions = [
  { label: "Train Number", value: "detrainmentList.trainNumber" },
  { label: "ENU Number", value: "detrainmentList.emuNumber" },
  { label: "Train Type", value: "detrainmentList.trainType" },
  { label: "Detrainment Type", value: "detrainmentList.detrainmentType" },
  { label: "Station", value: "detrainmentList.station" },
  { label: "Start Station", value: "detrainmentList.startStation" },
  { label: "End Station", value: "detrainmentList.endStation" },
  {
    label: "Detrainment Train Number",
    value: "detrainmentList.detrainmentTrainNumber",
  },
];

export const LTAInternalUseOptions = [
  { label: "CMT Activated", value: "cmtActivated" },
  { label: "CMT Activation Date/Time", value: "cmtActivationTime" },
  { label: "EOC Activated", value: "eocActivated" },
  { label: "EOC Activation Date/Time", value: "eocActivationTime" },
  { label: "LTA Remarks", value: "ltaRemarks" },
];

export const ReportDetailsOptions = [
  { label: "Created By", value: "createdBy" },
  { label: "Created Time", value: "createdTime" },
  //createdOrg
  //createdSubOrg
  { label: "Last Modified By", value: "lastModifiedBy" },
  { label: "Last Modified Time", value: "lastModifiedTime" },
];

// Bus
export const Bus_InitialReportOptions = [
  { label: "Start Date/Time", value: "startTime" },
  { label: "End Date/Time", value: "endTime" },
  { label: "Type", value: "incidentTypeName" },
  { label: "SubType", value: "incidentSubTypeName" },
  { label: "Nature of Incident", value: "natureofIncident" },
  { label: "Brief Incident Description", value: "incidentDescription" },
  { label: "Severity(PTO)", value: "ptoIncidentLevel" },
  { label: "Severity(LTA)", value: "ltaIncidentLevel" },
  { label: "Escalated", value: "isEscalatedToMOT" },
];

export const BusNumerServiceInfoListOptions = [
  { label: "Bus Service Number", value: "busNumberInfoList.busServiceNumber" },
  {
    label: "Bus Contract Number",
    value: "busNumberInfoList.busContractNumber",
  },
];
export const Bus_LocationInfoOptions = [
  { label: "Start Location", value: "startLocation" },
  { label: "End Location", value: "endLocation" },
  { label: "Start location Longitude", value: "startLocationLongitude" },
  { label: "Start location Latitude", value: "startLocationLatitude" },
  { label: "Location Type", value: "locationTypeName" },
  { label: "Location Details", value: "locationSubTypeName" },
  { label: "Location Description", value: "locationDescription" },
];

export const Bus_DetailedDescriptionOptions = [
  { label: "Media at Scene", value: "mediaAtScene" },
  { label: "Additional Information", value: "additionalInformation" },
  { label: "Number of Fatalities", value: "numberOfFatalities" },
  { label: "Number of Injured", value: "numberOfInjured" },
];
export const PersonInfoOptions = [
  { label: "Involved Person", value: "personsInfoList.involvedPersonName" },
  { label: "Race", value: "personsInfoList.raceName" },
  { label: "Age", value: "personsInfoList.age" },
  { label: "Age Range", value: "personsInfoList.ageRange" },
  { label: "Gender", value: "personsInfoList.gender" },
  { label: "Injured", value: "personsInfoList.injuredPerson" },
  {
    label: "Hospital Converyed To",
    value: "personsInfoList.hospitalInfo.hospitalConveryedName",
  },
  {
    label: "State of Converyed Person",
    value: "personsInfoList.hospitalInfo.stateOfConveryedPerson",
  },
  {
    label: "Extent Of Injury",
    value: "personsInfoList.hospitalInfo.extentOfInjury",
  },
];

export const Bus_ServiceInfoOptions = [
  { label: "Number of Buses", value: "numberOfBuses" },
  { label: "Bus Service Number", value: "busServiceInfoList.busServiceNumber" },
  {
    label: "Bus Registeration Number",
    value: "busServiceInfoList.busRegisterationNumber",
  },
  { label: "Enroute", value: "busServiceInfoList.enroute" },
  {
    label: "Number of Passenger onBoard",
    value: "busServiceInfoList.numberOfPassengerOnBoard",
  },
  {
    label: "Number of Passenger Transferred",
    value: "busServiceInfoList.numberOfPassengerTransferred",
  },
  {
    label: "Reason for non-issuance of Complimentary Ticket",
    value: "busServiceInfoList.reasonForNonInsurancOfComplimentaryTicket",
  },
  {
    label: "Number Of Complimentary Ticket Issued",
    value: "busServiceInfoList.numberOfComplimentaryTicketIssued",
  },
  {
    label: "Svc Resumption Time",
    value: "busServiceInfoList.svcResumptionTime",
  },
  {
    label: "Svc Resumption Location",
    value: "busServiceInfoList.svcResumptionLocation",
  },
  {
    label: "Replacemet Bus Registration Number",
    value: "busServiceInfoList.replacemetBusRegistrationNumber",
  },
  { label: "Bus Impounded", value: "busServiceInfoList.busImpounded" },
  {
    label: "Damage Description",
    value: "busServiceInfoList.damageDescription",
  },
];

export const BusCaptionInformationOptions = [
  { label: "Captain Name", value: "busServiceInfoList.captainName" },
  { label: "Captain Age", value: "busServiceInfoList.age" },
  { label: "Captain Employee ID", value: "busServiceInfoList.employeeId" },
  {
    label: "Captain Length of Service (Year)",
    value: "busServiceInfoList.lengthOfServiceYear",
  },
  {
    label: "Captain Length of Service (Month)",
    value: "busServiceInfoList.lengthOfServiceMonth",
  },
  { label: "Captain Nationality", value: "busServiceInfoList.nationality" },
];

export const RouteAmendmentOptions = [
  { label: "Original Route", value: "routeAmendmentList.originalRoute" },
  {
    label: "Route Taken",
    value: "routeAmendmentList.routeTakenList.routeTaken",
  },
  {
    label: "LTA Approved Route",
    value: "routeAmendmentList.routeTakenList.ltaApprovedRoute",
  },
  {
    label: "Bus Service Number",
    value:
      "routeAmendmentList.routeTakenList.busServiceInfoList.busServiceNumber",
  },
  {
    label: "Bus Regiesteration Number",
    value:
      "routeAmendmentList.routeTakenList.busServiceInfoList.busRegisterationNumber",
  },
  {
    label: "Number of Bus Stopped Skipped",
    value:
      "routeAmendmentList.routeTakenList.busServiceInfoList.numberOfSkippedBusStop",
  },
  {
    label: "Skipped Bus Stop(Start)",
    value:
      "routeAmendmentList.routeTakenList.busServiceInfoList.startSkippedBusStop",
  },
  {
    label: "Slipped Bus Stop(End)",
    value:
      "routeAmendmentList.routeTakenList.busServiceInfoList.endSkippedBusStop",
  },
];

export const ClaimsVerificationOptions = [
  {
    label: "Bus Service Number",
    value: "claimsVerificationInfoList.busServiceNumber",
  },
  {
    label: "Bus Registeration Number",
    value:
      "claimsVerificationInfoList.busRegisterationInfoList.busRegisterationNumber",
  },
  {
    label: "Number of Trips Affected",
    value:
      "claimsVerificationInfoList.busRegisterationInfoList.numberOfAffectedTrip",
  },
];

export const Bus_LTAInternalUseOptions = [
  { label: "CMT Activated", value: "cmtActivated" },
  { label: "CMT Activation Time", value: "cmtActivationTime" },
  { label: "GreenWave Activated", value: "greenWaveActivated" },
  { label: "EOC Activated", value: "eocActivated" },
  { label: "EOC Activation Time", value: "eocActivationTime" },
  { label: "LTA Remarks", value: "ltaRemarks" },
];

// Traffic
export const Traffic_InitialReportOptions = [
  { label: "Start Date/Time", value: "startTime" },
  { label: "End Date/Time", value: "endTime" },
  { label: "Type", value: "incidentTypeName" },
  { label: "RoadWork Agency Name", value: "roadWorkAgencyName" },
  { label: "Others RoadWork Agency", value: "othersRoadWorkAgency" },
  { label: "Brief Incident Description", value: "incidentDescription" },
  { label: "Severity(PTO)", value: "ptoIncidentLevel" },
  { label: "Severity(LTA)", value: "ltaIncidentLevel" },
  { label: "Escalated", value: "isEscalatedToMOT" },
];

export const Traffic_LocationInfoOptions = [
  { label: "Start Location", value: "startLocation" },
  { label: "End Location", value: "endLocation" },
  { label: "Start Location Longitude", value: "startLocationLongitude" },
  { label: "Start Location Latitude", value: "startLocationLatitude" },

  { label: "Direction", value: "direction" },
  { label: "Location Type", value: "locationTypeName" },
  { label: "Location SubType", value: "locationSubTypeName" },
  { label: "Location Description", value: "locationDescription" },
];

export const Traffic_DetailedDescriptionOptions = [
  { label: "iTransport ID", value: "iTransportId" },
  { label: "Information Source", value: "sourceName" },
  { label: "Additional Information", value: "additionalInformation" },
  { label: "Number of Fatalities", value: "numberOfFatalities" },
  { label: "Number of Injured", value: "numberOfInjured" },
  { label: "Media at Scene", value: "mediaAtScene" },
  {
    label: "Hospital ConveryedName",
    value: "hospitalInfoList.hospitalConveryedName",
  },
  { label: "Extent of Injury", value: "hospitalInfoList.extentOfInjury" },
];

export const RoadIncidentDetailsOptions = [
  { label: "Number of  Vehicles", value: "numberOfVehicles" },
  { label: "Camera ID", value: "cameraId" },
  { label: "Queue EndPoint", value: "queueEndPoint" },
  { label: "Queue End XCoordinate", value: "queueEndXCoordinate" },
  { label: "Queue End YCoordinate", value: "queueEndYCoordinate" },
  { label: "Max Queue Length", value: "maxQueueLength" },
  { label: "Tunnel X", value: "tunnelX" },
  { label: "Tunnel Y", value: "tunnelY" },
  { label: "CongestionStatus", value: "congestionStatus" },
  { label: "Congestion Start Time", value: "congestionStartTime" },
  { label: "Congestion End Time", value: "congestionEndTime" },
  { label: "Uplink ID", value: "upLinkId" },
  { label: "Downlink ID", value: "downLinkId" },
  { label: "Fax Comments", value: "faxComments" },
];

//Project
export const Project_InitialReportOptions = [
  { label: "Start Date/Time", value: "startTime" },
  { label: "End Date/Time", value: "endTime" },
  { label: "Type", value: "incidentTypeName" },
  { label: "Project Number", value: "projectNumber" },
  { label: "Project Name", value: "projectName" },
  { label: "Brief Incident Description", value: "incidentDescription" },
  { label: "Severity(PTO)", value: "ptoIncidentLevel" },
  { label: "Severity(LTA)", value: "ltaIncidentLevel" },
  { label: "Escalated", value: "isEscalatedToMOT" },
];

export const Project_LocationInformationOptions = [
  { label: "Start Location", value: "startLocation" },
  { label: "Start Location Longitude", value: "startLocationLongitude" },
  { label: "Start Location Latitude", value: "startLocationLatitude" },
  { label: "Location Description", value: "locationDescription" },
];

export const Project_DetailedDescriptionOptions = [
  { label: "Media at Scene", value: "mediaAtScene" },
  { label: "Number of Fatalities", value: "numberOfFatalities" },
  { label: "Number of Injured", value: "numberOfInjured" },
  { label: "Additional Information", value: "additionalInformation" },
  { label: "Hospital Info List", value: "hospitalInfoList" },
  { label: "Incident Duration", value: "incidentDuration" },
];

//Cyber
export const Cyber_InitialReportOptions = [
  { label: "Start Date/Time", value: "startTime" },
  { label: "End Date/Time", value: "endTime" },
  { label: "Type", value: "incidentTypeName" },
  {
    label: "Cybersecurity Classification",
    value: "ltaCybersecurityClassification",
  },
  { label: "Brief Incident Description", value: "incidentDescription" },
  { label: "Severity(PTO)", value: "ptoIncidentLevel" },
  { label: "Severity(LTA)", value: "ltaIncidentLevel" },
  { label: "Escalated", value: "isEscalatedToMOT" },
];

export const Cyber_DetailedDescriptionOptions = [
  { label: "System Owner", value: "systemOwner" },
  { label: "Name", value: "informerName" },
  { label: "Designation", value: "informerDesignation" },
  { label: "Organisation", value: "informerOrganisation" },
  { label: "Email Address", value: "informerEmail" },
  { label: "Telephone Number", value: "informerPhoneNumber" },
  {
    label: "Date and Time of System Owner Incident Awareness",
    value: "incidentAwarenessTime",
  },
  {
    label: "Date and Time of Report To Assistant Commissioner",
    value: "reportToAssistantCommissionerTime",
  },
  {
    label: "Related To Another Incident",
    value: "isRelatedToAnotherPreviousIncident",
  },
  { label: "More Details", value: "previousReportedIncidentInfo" },
  { label: "Number Of CII Affected", value: "numberOfAffected" },
];

export const Affected_CII_Information_Set = [
  { label: "Name of CII", value: "affectedSystemInfoList.systemName" },
  { label: "Name of CII Owner", value: "affectedSystemInfoList.ownerName" },
  { label: "Email Address", value: "affectedSystemInfoList.ownerEmail" },
  {
    label: "Telephone Number",
    value: "affectedSystemInfoList.ownerPhoneNumber",
  },
  {
    label: "Details of affected CII",
    value: "affectedSystemInfoList.affectedDetail",
  },
  {
    label: "Operating System of Affected CII",
    value: "affectedSystemInfoList.affectedOperatingSystem",
  },
  {
    label: "Other Operating System of Affected CII",
    value: "affectedSystemInfoList.otherAffectedOperatingSystem",
  },
  {
    label: "How did the incident occur",
    value: "affectedSystemInfoList.incidentDetail",
  },
  {
    label: "How was the incident first observed/sighted/detected",
    value: "affectedSystemInfoList.incidentAwarenessDescription",
  },
  {
    label: "Effects of Incident",
    value: "affectedSystemInfoList.effectsOfIncident",
  },
  {
    label: "Potential Effect On Other Assets",
    value: "affectedSystemInfoList.potentialEffect",
  },
  {
    label: "More Details",
    value: "affectedSystemInfoList.potentialEffectInfo",
  },

  {
    label:
      "Potential effect on other critical asset(s) belonging to other CII owner/licensee(s) owned",
    value: "affectedSystemInfoList.potentialEffectOfOtherOwner",
  },
  {
    label: "More Details",
    value: "affectedSystemInfoList.potentialEffectOfOtherOwnerInfo",
  },
  { label: "Follow-up action taken", value: "followupActionTaken" },
  {
    label: "Current status or resolution of incident",
    value: "resolutionStatus",
  },
  { label: "Next Course Of Action", value: "nextAction" },
  {
    label: "Earliest Known Date of attack/compromise",
    value: "earliestKnownTime",
  },
  { label: "Source/cause of incident", value: "incidentCause" },
  {
    label: "Reported to any law enforcement agency",
    value: "isReportedToLawAgency",
  },
];

export const IP_Address_Information_Set = [
  { label: "Ip Address", value: "ipEntryInfoList.ipAddress" },
  { label: "Involvement", value: "ipEntryInfoList.ipInvolvement" },
  { label: "Domain Name", value: "ipEntryInfoList.domainName" },
  {
    label: "Date/Time of Resoulotion of IP from Domain name",
    value: "ipEntryInfoList.domainResolutionIPTime",
  },
];

export const Domain_Name_Information_Set = [
  { label: "Domain Name", value: "domainEntryInfoList.domainName" },
  {
    label: "Involvemet of Domain name",
    value: "domainEntryInfoList.domainInvolvement",
  },
];

export const Email_Address_Information_Set = [
  { label: "Email Name", value: "emailAddressEntryInfoList.email" },
  {
    label: "Involvement of Email Address",
    value: "emailAddressEntryInfoList.emailInvolvement",
  },
];

export const Malicious_Files_Information_Set = [
  { label: "Filename", value: "maliciousFileInfoList.fileName" },
  { label: "Size", value: "maliciousFileInfoList.fileSize" },
  { label: "MD5 Hash", value: "maliciousFileInfoList.mD5Hash" },
  {
    label: "Technical Analysis",
    value: "maliciousFileInfoList.technicalAnalysis",
  },
  {
    label: "Assessment of Sectoral Situational Awareness",
    value: "maliciousFileInfoList.assessmentOfSectoralSituationalAwareness",
  },
];

//Others
export const Others_InitialReportOptions = [
  { label: "Start Date/Time", value: "startTime" },
  { label: "End Date/Time", value: "endTime" },
  { label: "Type", value: "incidentTypeName" },
  { label: "Brief Incident Description", value: "incidentDescription" },
  { label: "Severity(PTO)", value: "ptoIncidentLevel" },
  { label: "Severity(LTA)", value: "ltaIncidentLevel" },
  { label: "Escalated", value: "isEscalatedToMOT" },
];
export const Others_LocationInformationOptions = [
  { label: "Start Location", value: "startLocation" },
  { label: "End Location", value: "endLocation" },
  { label: "Start Location Longitude", value: "startLocationLongitude" },
  { label: "Start Location Latitude", value: "startLocationLatitude" },
  { label: "Location Description", value: "locationDescription" },
];

export const RailOptionsMapping = {
  "Initial Report": InitialReportOptions,
  "Location Information": LocationInformationOptions,
  "Detailed Description": DetailedDescriptionOptions,
  "Hospital Conveyed To Information": HospitalInfoOptions,
  "Agency Activated Information": AgencyActivatedInfoOptions,
  "Service Resumption Information": ServiceResumptionInfoOptions,
  "Service Information": ServiceInfoOptions,
  "For LTA Internal Use": LTAInternalUseOptions,
  "Report Details": ReportDetailsOptions,
};

export const BusOptionsMapping = {
  "Initial Report": Bus_InitialReportOptions,
  "Bus Service Information": BusNumerServiceInfoListOptions,
  "Location Information": Bus_LocationInfoOptions,
  "Detailed Description": Bus_DetailedDescriptionOptions,
  "Involved Person(s) Information": PersonInfoOptions,
  "Agency Activated Information": AgencyActivatedInfoOptions,
  "Service Information": Bus_ServiceInfoOptions,
  "Bus Caption Information": BusCaptionInformationOptions,
  "Route Amendment": RouteAmendmentOptions,
  "Claims Verification": ClaimsVerificationOptions,
  "For LTA Internal Use": Bus_LTAInternalUseOptions,
  "Report Details": ReportDetailsOptions,
};

export const TrafficOptionsMapping = {
  "Initial Report": Traffic_InitialReportOptions,
  "Location Information": Traffic_LocationInfoOptions,
  "Detailed Description": Traffic_DetailedDescriptionOptions,

  "Agency Activated Information": AgencyActivatedInfoOptions,
  "Road Incident Details": RoadIncidentDetailsOptions,
  "For LTA Internal Use": LTAInternalUseOptions,
  "Report Details": ReportDetailsOptions,
};

export const ProjectOptionsMapping = {
  "Initial Report": Project_InitialReportOptions,
  "Location Information": Project_LocationInformationOptions,
  "Detailed Description": Project_DetailedDescriptionOptions,
  "Agency Activated Information": AgencyActivatedInfoOptions,
  "For LTA Internal Use": LTAInternalUseOptions,
  "Report Details": ReportDetailsOptions,
};

export const CyberOptionsMapping = {
  "Initial Report": Cyber_InitialReportOptions,
  "Location Information": Project_LocationInformationOptions,
  "Detailed Description": Cyber_DetailedDescriptionOptions,
  "Affected CII Information Set": Affected_CII_Information_Set,
  "IP Address Information Set": IP_Address_Information_Set,
  "Domain Name Information Set": Domain_Name_Information_Set,
  "Email Address Information Set": Email_Address_Information_Set,
  "Malicious Files Information Set": Malicious_Files_Information_Set,
  "For LTA Internal Use": LTAInternalUseOptions,
  "Report Details": ReportDetailsOptions,
};

export const OthersOptionsMapping = {
  "Initial Report": Others_InitialReportOptions,
  "Location Information": Others_LocationInformationOptions,
  "Detailed Description": Project_DetailedDescriptionOptions,
  "Agency Activated Information": AgencyActivatedInfoOptions,
  "For LTA Internal Use": LTAInternalUseOptions,
  "Report Details": ReportDetailsOptions,
};
