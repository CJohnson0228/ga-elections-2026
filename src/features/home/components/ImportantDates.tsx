import { Calendar, CheckCircle, Clock } from "lucide-react";
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";

export default function ImportantDates() {
  return (
    <div className="bg-white">
      <Container className="py-12 sm:py-16">
        <div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 text-center sm:text-left">
            Important Dates
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="hover:scale-[1.05] transition-transform duration-300 ease-out">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">
                      Voter Registration Deadline
                    </p>
                    <p className="text-lg font-display font-bold text-gray-900">
                      October 6, 2026
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="hover:scale-[1.05] transition-transform duration-300 ease-out">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">
                      Early Voting Begins
                    </p>
                    <p className="text-lg font-display font-bold text-gray-900">
                      October 12, 2026
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="hover:scale-[1.05] transition-transform duration-300 ease-out">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">
                      Primary Election Day
                    </p>
                    <p className="text-lg font-display font-bold text-gray-900">
                      May 19, 2026
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="hover:scale-[1.05] transition-transform duration-300 ease-out">
              <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-primary-200 bg-primary-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-700 font-semibold mb-1">
                      General Election Day
                    </p>
                    <p className="text-lg font-display font-bold text-primary-900">
                      November 3, 2026
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
