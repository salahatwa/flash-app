import { Staroptions } from './../../models/staroptions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Status } from './../../models/status';
import { PollModel, PollViewModel, PollVote, PollResult, UserPollsResponseModel } from './../../models/poll';
import { QuestionType, QuestionAnswersBody, QuestionAnswerRequest } from './../../models/question-type';
import { SurveyModel, UserSurveysResponseModel } from './../../models/survey';
import { UserSignInModel, UserLoginResponse } from './../../models/users';
import { DashboardMetricTile } from './../../models/dashboard';
@Injectable({
  providedIn: 'root'
})


export class ApiService {
  _API: string;
  constructor(public http: HttpClient) {
    this._API = environment.API_URL + '/';
  }

  deletePoll(pollid: string) {
    return this.http.delete<boolean>(this._API + `poll/delete/${pollid}`);
  }

  getUserPolls(pagenumber,pagesize) : Observable<UserPollsResponseModel>  {
    return this.http.get<UserPollsResponseModel>(this._API + `poll/user/pagenumber/${pagenumber}/pagesize/${pagesize}`);
  }

  getUserSurveys(pagenumber: number, pagesize: number) : Observable<UserSurveysResponseModel> {
    return this.http.get<UserSurveysResponseModel>(this._API + `survey/user/pagenumber/${pagenumber}/pagesize/${pagesize}`);
  }

  getDashboardTiles() : Observable<DashboardMetricTile>  {
    return this.http.get<DashboardMetricTile>(this._API + `dashboard/tilemetrics`);
  }

  signInUser(data: UserSignInModel) : Observable<UserLoginResponse>  {
    return this.http.post<UserLoginResponse>(this._API + 'user/login', data);
  }

  getQuestionTypes(): Observable<QuestionType[]> {
    return this.http.get<QuestionType[]>(this._API + 'survey/questiontypes');
  }

  getDataStarOptions(): Observable<Staroptions[]> {
    return this.http.get<Staroptions[]>(this._API + 'survey/data/staroptions');
  }

  getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(this._API + 'status');
  }

  addPoll(data: PollModel): Observable<PollViewModel> {
    return this.http.put<PollViewModel>(this._API + 'poll/add', data);
  }

  getPoll(pollguid: string): Observable<PollViewModel> {
    return this.http.get<PollViewModel>(this._API + `poll/guid/${pollguid}`);
  }

  addPollVote(data: PollVote): Observable<boolean> {
    return this.http.put<boolean>(this._API + 'poll/vote', data);
  }

  pollResult(pollId: string): Observable<PollResult> {
    return this.http.get<PollResult>(this._API + `poll/result/${pollId}`);
  }

  //Survey
  addSurvey(data: SurveyModel): Observable<SurveyModel> {
    return this.http.put<SurveyModel>(this._API + 'survey/add', data);
  }

  getSurvey(surveyguid: string): Observable<SurveyModel> {
    return this.http.get<SurveyModel>(this._API + `survey/guid/${surveyguid}`);
  }

  beginSurvey(surveyguid: string, emailId: any): Observable<string> {
    return this.http.post<string>(this._API + `survey/begin/${surveyguid}/${emailId}`, '');
  }

  submitSurvey(surveyguid: string, session: string, data: QuestionAnswerRequest): Observable<string> {
    return this.http.post<string>(this._API + `survey/submit/${surveyguid}/${session}`, data);
  }

  deleteSurvey(surveyId: any) {
    return this.http.delete<boolean>(this._API + `survey/delete/${surveyId}`);
  }
}
