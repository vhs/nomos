<?php

namespace vhs\web\enums;

enum HttpStatusCodes: int {
    case Info_Continue = 100;
    case Info_Switching_Protocols = 101;
    case Info_Processing = 102;
    case Info_Early_Hints = 103;

    case Success_Ok = 200;
    case Success_Created = 201;
    case Success_Accepted = 202;
    case Success_NonAuthoritative_Information = 203;
    case Success_No_Content = 204;
    case Success_Reset_Content = 205;
    case Success_Partial_Content = 206;
    case Success_Multi_Status = 207;
    case Success_Already_Reported = 208;
    case Success_IM_Used = 226;

    case Redirect_Multiple_Choices = 301;
    case Redirect_Found = 302;
    case Redirect_See_Other = 303;
    case Redirect_Not_Modified = 304;
    /** Temporary redirect with protocol intact */
    case Redirect_Temporary_Redirect = 307;
    /** Permanently redirect with protocol intact */
    case Redirect_Permanent_redirect = 308;

    case Client_Error_Bad_Request = 400;
    case Client_Error_Unauthorized = 401;
    case Client_Error_Payment_Required = 402;
    case Client_Error_Forbidden = 403;
    case Client_Error_Not_Found = 404;
    case Client_Error_Method_Not_Allowed = 405;
    case Client_Error_Not_Acceptable = 406;
    case Client_Error_Proxy_Authentication_Required = 407;
    case Client_Error_Request_Timeout = 408;
    case Client_Error_Conflict = 409;
    case Client_Error_Gone = 410;
    case Client_Error_Length_Required = 411;
    case Client_Error_Precondition_Failed = 412;
    case Client_Error_Content_Too_Large = 413;
    case Client_Error_Uri_Too_Long = 414;
    case Client_Error_Unsupported_Media_Type = 415;
    case Client_Error_Range_Not_Satisfiable = 416;
    case Client_Error_Expectation_Failed = 417;
    case Client_Error_Im_a_teapot = 418;
    case Client_Error_Misdirected_Request = 421;
    case Client_Error_Unprocessable_Content = 422;
    case Client_Error_Locked = 423;
    case Client_Error_Failed_Dependency = 424;
    case Client_Error_Too_Early = 425;
    case Client_Error_Upgrade_Required = 426;
    case Client_Error_Precondition_Required = 428;
    case Client_Error_Too_Manu_requests = 429;
    case Client_Error_Request_Header_Fields_Too_Large = 431;
    case Client_Error_Unavailable_For_Legal_Reasons = 451;

    case Server_Error_Internal_Service_Error = 500;
    case Server_Error_Not_Implemented = 501;
    case Server_Error_Bad_Gateway = 502;
    case Server_Error_Service_Unavailable = 503;
    case Server_Error_Gateway_Timeout = 504;
    case Server_Error_HTTP_Version_Not_Supported = 505;
    case Server_Error_Variant_Also_Negotiates = 506;
    case Server_Error_Insufficient_Storage = 507;
    case Server_Error_Loop_Detected = 508;
    case Server_Error_Not_Extended = 510;
    case Server_Error_Network_Authentication_Required = 511;
}
