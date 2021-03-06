/**
 * Copyright 2017-2020 the original author or authors from the JHipster Online project.
 *
 * This file is part of the JHipster Online project, see https://github.com/jhipster/jhipster-online
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { TestBed } from '@angular/core/testing';
import { JhiDateUtils } from 'ng-jhipster';

import { UserService, User } from 'app/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service Tests', () => {
    describe('User Service', () => {
        let service: UserService;
        let httpMock;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [JhiDateUtils]
            });

            service = TestBed.get(UserService);
            httpMock = TestBed.get(HttpTestingController);
        });

        afterEach(() => {
            httpMock.verify();
        });

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find('user').subscribe(() => {});

                const req = httpMock.expectOne({ method: 'GET' });
                const resourceUrl = SERVER_API_URL + 'api/users';
                expect(req.request.url).toEqual(`${resourceUrl}/user`);
            });
            it('should return User', () => {
                service.find('user').subscribe(received => {
                    expect(received.body.login).toEqual('user');
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(new User(1, 'user'));
            });

            it('should return Authorities', () => {
                service.authorities().subscribe(_authorities => {
                    expect(_authorities).toEqual(['ROLE_USER', 'ROLE_ADMIN']);
                });
                const req = httpMock.expectOne({ method: 'GET' });

                req.flush(['ROLE_USER', 'ROLE_ADMIN']);
            });

            it('should propagate not found response', () => {
                service.find('user').subscribe(null, (_error: any) => {
                    expect(_error.status).toEqual(404);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush('Invalid request parameters', {
                    status: 404,
                    statusText: 'Bad Request'
                });
            });
        });
    });
});
